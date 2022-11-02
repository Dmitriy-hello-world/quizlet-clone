export const TOKEN   = 'TOKEN'
export const PER_PAGE = 20
export const HOST = process.env.HOST || 'http://hisokacards.online'
export const API_URL = process.env.API_URL || 'http://hisokacards.online/api/v1/'
export const CREATE_MODULE_TABS = [
    {
        label: 'Name',
        name: 'name',
    },
    {
        label: 'Description',
        name: 'description',
    },
    {
        label: 'Private',
        name: 'private',
        typeField: 'boolean',
        defaultChecked: true
    },
    {
        label: 'Edit by outsiders',
        name: 'editByOutsiders',
        typeField: 'boolean'
    }
]


export const LANGUAGES = {
  af: 'Afrikaans',
  sq: 'Albanian',
  ar: 'Arabic',
  hy: 'Armenian',
  az: 'Azerbaijani',
  eu: 'Basque',
  be: 'Belarusian',
  bn: 'Bengali',
  bs: 'Bosnian',
  bg: 'Bulgarian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  ny: 'Chichewa',
  'zh-cn': 'Chinese Simplified',
  'zh-tw': 'Chinese Traditional',
  co: 'Corsican',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  nl: 'Dutch',
  en: 'English',
  eo: 'Esperanto',
  et: 'Estonian',
  tl: 'Filipino',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Frisian',
  gl: 'Galician',
  ka: 'Georgian',
  de: 'German',
  el: 'Greek',
  gu: 'Gujarati',
  ht: 'Haitian Creole',
  ha: 'Hausa',
  haw: 'Hawaiian',
  iw: 'Hebrew',
  hi: 'Hindi',
  hmn: 'Hmong',
  hu: 'Hungarian',
  is: 'Icelandic',
  ig: 'Igbo',
  id: 'Indonesian',
  ga: 'Irish',
  it: 'Italian',
  ja: 'Japanese',
  jw: 'Javanese',
  kn: 'Kannada',
  kk: 'Kazakh',
  km: 'Khmer',
  ko: 'Korean',
  ku: 'Kurdish (Kurmanji)',
  ky: 'Kyrgyz',
  lo: 'Lao',
  la: 'Latin',
  lv: 'Latvian',
  lt: 'Lithuanian',
  lb: 'Luxembourgish',
  mk: 'Macedonian',
  mg: 'Malagasy',
  ms: 'Malay',
  ml: 'Malayalam',
  mt: 'Maltese',
  mi: 'Maori',
  mr: 'Marathi',
  mn: 'Mongolian',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  no: 'Norwegian',
  ps: 'Pashto',
  fa: 'Persian',
  pl: 'Polish',
  pt: 'Portuguese',
  ma: 'Punjabi',
  ro: 'Romanian',
  ru: 'Russian',
  sm: 'Samoan',
  gd: 'Scots Gaelic',
  sr: 'Serbian',
  st: 'Sesotho',
  sn: 'Shona',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somali',
  es: 'Spanish',
  su: 'Sudanese',
  sw: 'Swahili',
  sv: 'Swedish',
  tg: 'Tajik',
  ta: 'Tamil',
  te: 'Telugu',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  cy: 'Welsh',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zu: 'Zulu'
}

export const LOGIN_TABS = [
    {
      label: 'Email',
      name: 'email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password'
    },
]

export const SIGN_UP_TABS = [
    {
      label: 'Name',
      name: 'firstName',
    },
    {
      label: "Second name",
      name: "secondName"
    },
    {
      name: 'lang',
      label: 'Your language',
      typeField: 'select',
      values : Object.entries(LANGUAGES)
    },
    {
      label: 'Email',
      name: 'email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password'
    },
    {
      label: 'Confirm password',
      name: 'confirmPassword',
      type: 'password'
    }
]

export const WORD_UPDATE_TABS = [
    {
      label: 'Image',
      name: 'image',
      typeField: 'image'
    },
    {
      label: 'Key',
      name: 'term'
    },
    {
      label: 'Value',
      name: 'definition'
    }
]