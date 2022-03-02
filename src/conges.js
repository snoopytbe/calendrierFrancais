import React from 'react';
import { estFerie } from './joursFeries';
import { putApiData, deleteApiData } from './ApiData';
import moment from 'moment';
import { extendMoment } from 'moment-range';
moment = extendMoment(moment);

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default function handleNewConge(abreviation, type, conges, highlighted) {
  let newConges = [];
  // on va ajouter/modifier avec le PUT tous les jours "highlighted"
  //console.log(abreviation);
  Array.from(highlighted.by('day')).forEach((oneHighlighted) => {
    // On ne sauvegarde les conges que pour les jours qui ne sont ni fériés, ni dimanche, ni samedi
    let date = moment(oneHighlighted, 'yyyy-MM-DD');
    let day = date.day();

    if (!estFerie(date) && !(day === 0) && !(day === 6)) {
      // On commence par chercher l'id et on le créé s'il n'existe pas
      let id =
        conges.filter((oneConge) => oneConge.date === oneHighlighted)?.[0]
          ?.id ?? uuidv4();

      let duree =
        type === 'temps'
          ? abreviation
          : conges.filter((oneConge) => oneConge.date === oneHighlighted)?.[0]
              ?.duree ?? 'J';

      let abr =
        type === 'temps'
          ? conges.filter((oneConge) => oneConge.date === oneHighlighted)?.[0]
              ?.abr
          : abreviation;

      let data = {
        date: oneHighlighted.format("yyyy-MM-DD"),
        abr: abr,
        id: id,
        duree: duree,
      };

      //console.log(data)
      if (!abr) {
        deleteApiData([data]);
      } else {
        putApiData([data]);
        newConges = [...newConges, data];
      }
    }
  });

  //on complète avec les jours présents dans "conges" qui n'étaient pas highlighted
  conges?.forEach((oneConge) => {
    if (!highlighted?.contains(moment(oneConge.date, 'YYYY-MM-DD')))
      newConges = [...newConges, oneConge];
  });

  //console.log(conges)
  return newConges;
}
