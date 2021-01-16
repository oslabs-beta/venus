/**
 * @name AggregateStats
 * @desc Child of Dashboard (no children), Indiviual Service Card showing aggregate stats of 
 * particular service
 */

import React from 'react'

function AggregateStats(): JSX.Element{
    return (
        <div className= "aggStats">
            <h1>
                I am aggregate Stats on 1st page. Dashboard is my daddy. Dont mess with daddy. 
                {/* create onClick method */}
            </h1>
        </div>
    )
}

export { AggregateStats };
