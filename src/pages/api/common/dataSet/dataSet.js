

export const GenerateOptions = (typeObject) => {
  const options = Object.entries(typeObject).map(([value, text]) => (
    {value, text}
  ));
  // options.unshift({value: '', text: '전체'});

  return options;
}