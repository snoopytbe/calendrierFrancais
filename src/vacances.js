import moment from 'moment';
import { Ascension } from './joursFeries';

export function nthDay(dt, day, number) {
  // Retourne le nième jour du mois par rapport à la date dt
  // dt : date de référence
  // day : jour de la semaine
  // number : numero du jour = nieme
  var firstDay = dt.clone().date(1).day(day);
  // Si firstDay est le mois précédent il faut décaler firstDay d'une semaine
  if (firstDay.isBefore(dt.startOf('month'))) firstDay.add(7, 'days');
  var result = firstDay.clone().add((number - 1) * 7, 'days');
  if (result.isAfter(dt.endOf('month'))) result = moment.invalid();
  return result;
}

function estToussaint(dt) {
  // Le 1/11 est dans la 2e semaine de vacances de la Toussaint
  var finVacances = moment([dt.year(), 10, 2]).day(7);
  var debutVacances = finVacances.clone().add(-15, 'days');
  return (
    debutVacances.diff(dt, 'days') <= 0 && finVacances.diff(dt, 'days') >= 0
  );
}

function debutVacancesNoel(annee) {
  // Démarre le samedi qui précède Noël
  // sauf si Noel est un dimanche auquel cas cela démarre le samedi 8 jours avant
  var Noel = moment([annee, 11, 25]);
  return Noel.clone().day(6 - (Noel.day() === 0 ? 2 : 1) * 7);
}

function finVacancesNoel(annee) {
  var Noel = moment([annee, 11, 25]);
  return debutVacancesNoel(annee).add(15 + (Noel.day() === 0 && 1), 'days');
}

function estNoel(dt) {
  // Attention le début et la fin des vacances sont sur deux années différentes
  var debutVacances = debutVacancesNoel(dt.year());
  var finVacances = finVacancesNoel(dt.year() - 1);
  return (
    debutVacances.diff(dt, 'days') <= 0 || finVacances.diff(dt, 'days') >= 0
  );
}

function debutVacancesFevrier(annee, zone) {
  // Démarre 5 semaines après la fin des vacances de Noël pour la première zone
  var Numero;

  switch (zone) {
    case 'A':
      Numero = ((annee - 2018) % 3) + 1;
      break;
    case 'B':
      Numero = ((annee - 2018) % 3) + 3;
      break;
    case 'C':
      Numero = ((annee - 2018) % 3) + 2;
      break;
    default:
      Numero = 0;
  }

  return finVacancesNoel(annee - 1).day(6 + (3 + Numero) * 7);
}

function finVacancesFevrier(annee, zone) {
  return debutVacancesFevrier(annee, zone).add(15, 'days');
}

function estFevrier(dt, zone) {
  var debutVacances = debutVacancesFevrier(dt.year(), zone);
  var finVacances = finVacancesFevrier(dt.year(), zone);
  return (
    debutVacances.diff(dt, 'days') <= 0 && finVacances.diff(dt, 'days') >= 0
  );
}

function debutVacancesPaques(annee, zone) {
  //Démarre 8 semaines après le début des vacances de février avant 2022 et 9 semaines à partir de 2022
  return debutVacancesFevrier(annee, zone).add(
    7 * 8 + 1 + (annee >= 2022 && 1),
    'days'
  );
}

function finVacancesPaques(annee, zone) {
  return debutVacancesPaques(annee, zone).add(15, 'days');
}

function estPaques(dt, zone) {
  var debutVacances = debutVacancesPaques(dt.year(), zone);
  var finVacances = finVacancesPaques(dt.year(), zone);
  return (
    debutVacances.diff(dt, 'days') <= 0 && finVacances.diff(dt, 'days') >= 0
  );
}

function estAscencion(dt) {
  var debutVacances = Ascension(dt.year());
  var finVacances = Ascension(dt.year()).day(7);
  return (
    debutVacances.diff(dt, 'days') <= 0 && finVacances.diff(dt, 'days') >= 0
  );
}

function debutVacancesEte(annee) {
  // Date approximative
  // 1er jour avant le 8 juillet inclus qui est un samedi, un vendredi ou un mercredi
  var debutVacances = moment([annee, 6, 9]);
  var joursPossibles = [3, 5, 6];
  do {
    if (joursPossibles.includes(debutVacances.day())) break;
    debutVacances.add(-1, 'days');
  } while (debutVacances.month() === 6);
  return debutVacances;
}

function finVacancesEte(annee) {
  // Date approximative
  // La rentrée est le premier lundi, mardi ou jeudi de septembre
  var finVacances = moment([annee, 8, 1]);
  var joursPossibles = [1, 2, 4];
  do {
    if (joursPossibles.includes(finVacances.day())) break;
    finVacances.add(1, 'days');
  } while (finVacances.month() === 8);
  return finVacances.add(-1, 'days');
}

function estEte(dt) {
  var debutVacances = debutVacancesEte(dt.year());
  var finVacances = finVacancesEte(dt.year());
  return (
    debutVacances.diff(dt, 'days') <= 0 && finVacances.diff(dt, 'days') >= 0
  );
}

export function estVacances(dt, zone) {
  return (
    estToussaint(dt) ||
    estNoel(dt) ||
    estFevrier(dt, zone) ||
    estPaques(dt, zone) ||
    estAscencion(dt) ||
    estEte(dt)
  );
}
