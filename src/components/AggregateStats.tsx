/**
 * @name AggregateStats
 * @desc Child of Dashboard (no children), Indiviual Service Card showing aggregate stats of 
 * particular service
 */
import { PageHeader } from 'antd'
import React from 'react'

function AggregateStats(): JSX.Element{
    return (
        <div className= "aggStats">
            <PageHeader>
            <h1>
                System Aggregate Stats   
                {/* create onClick method */}
            </h1>
            </PageHeader>
        </div>
    )
}

export { AggregateStats };
