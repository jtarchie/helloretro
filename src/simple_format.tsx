function SimpleFormat({ text, classes }: { text: string; classes: string }) {
  const lines = text.split(/\n{1,}/).map((line) => {
    return <p class={classes}>{line}</p>;
  });
  return <>{lines}</>;
}

export { SimpleFormat };
