import * as React from "react";

import { UrlContext } from "../contexts/globalContext";
import Card from "../components/ServiceCard";

const Urls = () => {
  const { urls, updateUrls } = React.useContext(UrlContext) as ContextType;
  return (
    <>
      {urls.map((url: IUrl) => (
        <Card key={url.id} updateUrl={updateUrl} url={url} />
      ))}
    </>
  );
};

export default Urls;