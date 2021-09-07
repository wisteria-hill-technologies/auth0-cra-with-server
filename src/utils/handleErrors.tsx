const handleErrors = (res: any) => {
  console.log('handleErrors res >>', res);
  if(!res.ok) throw Error(res.statusText);
  return res.json();
}

export default handleErrors;