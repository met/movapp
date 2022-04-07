import { Translation } from 'components/basecomponents/TranslationsContainer';
// JSON translation files
import Basic from './basic_sk.json';
import UzitecneFraze from './uzitecne-fraze_sk.json';
import Cas from './cas_sk.json';
import HromadnaDoprava from './hromadna-doprava_sk.json';
import Zoo from './zoo_sk.json';
import NaNakupu from './na-nakupu_sk.json';
import NaUrade from './na-urade_sk.json';
import Obleceni from './obleceni_sk.json';
import Drogerie from './drogerie_sk.json';
import Penize from './penize_sk.json';
import Rodina from './rodina_sk.json';
import Doctor from './doctor_sk.json';
import VDomacnosti from './vdomacnosti_sk.json';
import VeMeste from './vemeste_sk.json';
import VeSkole from './veskole_sk.json';
import VeSkolce from './veskolce_sk.json';
import Dobrovolnici from './dobrovolnici.json'; // zatim nejsou prelozeny
import ZradnaSlovicka from './zradna-slovicka_sk.json';

export interface TranslationsType {
  category_name_cz: string;
  category_name_ua: string;
  translations: Translation[];
}

export const translations: TranslationsType[] = [
  {
    category_name_ua: 'Основні фрази',
    category_name_cz: 'Základné frázy',
    translations: Basic,
  },
  {
    category_name_ua: 'Корисні фрази',
    category_name_cz: 'Užitočné frázy',
    translations: UzitecneFraze,
  },
  {
    category_name_cz: 'Rodina',
    category_name_ua: 'Родина',
    translations: Rodina,
  },
  {
    category_name_ua: 'Час',
    category_name_cz: 'Čas',
    translations: Cas,
  },
  {
    category_name_ua: 'Громадський транспорт',
    category_name_cz: 'Hromadná doprava',
    translations: HromadnaDoprava,
  },
  {
    category_name_ua: 'Їдемо в зоопарк',
    category_name_cz: 'Ideme do ZOO',
    translations: Zoo,
  },
  {
    category_name_ua: 'Покупки',
    category_name_cz: 'Na nákupe',
    translations: NaNakupu,
  },
  {
    category_name_cz: 'Na úrade',
    category_name_ua: 'В органах влади',
    translations: NaUrade,
  },
  {
    category_name_cz: 'Oblečenie',
    category_name_ua: 'Одяг',
    translations: Obleceni,
  },
  {
    category_name_cz: 'Drogéria',
    category_name_ua: 'Побутова хімія (косметика)',
    translations: Drogerie,
  },
  {
    category_name_cz: 'Peniaze',
    category_name_ua: 'Гроші',
    translations: Penize,
  },
  {
    category_name_cz: 'U lekára',
    category_name_ua: 'У лікаря',
    translations: Doctor,
  },
  {
    category_name_cz: 'V domácnosti',
    category_name_ua: 'Вдома',
    translations: VDomacnosti,
  },
  {
    category_name_cz: 'V meste',
    category_name_ua: 'У місті',
    translations: VeMeste,
  },
  {
    category_name_cz: 'V škole',
    category_name_ua: 'У школі',
    translations: VeSkole,
  },
  {
    category_name_cz: 'V škôlke',
    category_name_ua: 'У дитсадку',
    translations: VeSkolce,
  },
  {
    category_name_cz: 'Dobrovolníci',
    category_name_ua: 'Добровольці',
    translations: Dobrovolnici,
  },
  {
    category_name_cz: 'Zradné slovíčka',
    category_name_ua: 'Слова із іншим значенням',
    translations: ZradnaSlovicka,
  },
];
