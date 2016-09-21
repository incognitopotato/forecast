  export const renderWithDefault = (finalMarkup, defaultMarkup, shouldRender) => {
    return (data) => {
        return shouldRender ? finalMarkup(data) : defaultMarkup(data);
    };
  };