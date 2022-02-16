import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const couleurAnnee = '#070722ff';
const couleurMois = '#131347ff';
const couleurPolice = '#f8f4ffff';
const couleurDimanche = '#aad5f4';
const couleurNumeroJour = 'D1C7CF';
const couleurJourFerie = '#33cc66';
const couleurVacances = '#e60000';
const couleurVacancesAutres = '#FF8F8F';
const couleurBord = '#3F3F6E';
const couleurConges = '#fcc603';
const white = '#ffffff';
const black = '#000000';

export const StyleTableCell = (theme) => ({
  root: {
    textAlign: 'left',
    border: `1px solid ${white}`,
    paddingBottom: '1px',
    paddingTop: '1px',
    fontSize: '0.7em',
    color: couleurPolice,

    '&.annee': {
      textAlign: 'center',
      backgroundColor: couleurAnnee,
      fontSize: '1em',
    },
    '&.mois': {
      textAlign: 'center',
      backgroundColor: couleurMois,
      fontSize: '0.8em',
    },
    '&.jour': {
      backgroundColor: white,
      borderColor: 'D2D2D2',
      color: black,
    },
    '&.dimanche': {
      backgroundColor: couleurDimanche,
      borderColor: couleurDimanche,
      color: black,
    },
    '&.ferie': {
      backgroundColor: couleurJourFerie,
      borderColor: couleurJourFerie,
      color: black,
    },
    '&.noDate': {
      backgroundColor: white,
    },
    '&.conges': {
      backgroundColor: couleurConges,
    },
    '&.vacances': {
      backgroundColor: couleurVacances,
      borderLeftColor: couleurVacances,
    },
    '&.vacancesAutres': {
      backgroundColor: couleurVacancesAutres,
      borderLeftColor: couleurVacancesAutres,
    },
    '&.largeurvacances': {
      width: '5px',
      padding: '1px',
    },
    '&.largeurjour': {
      width: '30px',
      paddingLeft: '10px',
      paddingRight: '5px',
    },
    '&.largeurconges': {
      textAlign: 'center',
      width: '60px',
      paddingLeft: '5px',
      paddingRight: '10px',
    },
    '&.largeurmiconges': {
      textAlign: 'center',
      width: '20px',
      paddingLeft: '5px',
      paddingRight: '10px',
    },
    '&.largeurmois': {
      //width: '100px',
    },
    '&.highlightedLeft': {
      borderLeftColor: black,
      opacity: 0.5,
    },
    '&.highlightedRight': {
      borderRightColor: black,
      opacity: 0.5,
    },
    '&.highlightedTop': {
      borderTopColor: black,
      opacity: 0.5,
    },
    '&.highlightedBottom': {
      borderBottomColor: black,
      opacity: 0.5,
    },
  },
});

export default withStyles(StyleTableCell, { name: 'MyTableCell' })(TableCell);
