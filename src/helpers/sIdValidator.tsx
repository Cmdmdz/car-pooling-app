export function sIdValidator(sId:string) {
 
  if (!sId) return "student can't be empty."
  if (sId.length < 8 || sId.length > 10) return 'Ooops! We need a valid email address.'
  return ''
}
