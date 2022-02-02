import * as React from 'react';

interface Props {
  title: string;
  underlineIndex: number;
}

const UnderlinedText: React.FunctionComponent<Props> = ({
  title,
  underlineIndex,
}) => {
  const titleElements = [
    title.slice(0, underlineIndex),
    title[underlineIndex],
    title.slice(underlineIndex + 1),
  ];

  const underlineStyles = { textDecoration: 'underline' };

  return (
    <>
      {titleElements.map((t, i) => (
        <span key={t} style={i === 1 ? underlineStyles : {}}>
          {t}
        </span>
      ))}
    </>
  );
};

export default UnderlinedText;
