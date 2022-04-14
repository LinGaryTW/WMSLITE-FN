export interface Config {
  'whAttribGroup': number | null,
  'attribs': Array<{
    'key': string, 'value': string, 'id': number, 'index': number, 'whattribgroup': number
  }>
}
