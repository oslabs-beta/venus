/**
 * @name ServiceCard
 * @desc Individual Service card that displays metrics for particular service
 */

import React from 'react'

// export default function ServiceCard (): JSX.Element{
//     return (
//         <div className="serviceCard">
//         <h1>
//             {/* create onClick method */}Service Card
//         </h1>
//         </div>
//     )
// }



type Props = {
    url: IUrl;
    updateCard: (id: number) => void;
  };
  
  const Card: React.FC<Props> = ({ url, updateUrl }) => {
    const checkUrl: string = url.status ? `line-through` : "";
    return (
      <div className="Card">
        <div className="Card--text">
          <h1 className={checkUrl}>{url.name}</h1>
          <span className={checkUrl}>{url.description}</span>
        </div>
        <button
          onClick={() => updateUrl(url.id)}
          className={url.status ? `hide-button` : "Card--button"}
        >
          Complete
        </button>
      </div>
    );
  };
  
  export default Card;