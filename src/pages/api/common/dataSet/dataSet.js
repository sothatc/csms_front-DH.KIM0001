

export const GenerateOptions = (typeObject, selAll) => {
  const options = Object.entries(typeObject).map(([value, text]) => (
    {value, text}
  ));
  if(selAll) {
    options.unshift({value: '', text: '전체'});
  }

  return options;
}