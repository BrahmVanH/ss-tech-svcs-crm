import React from 'react';
import { VictoryChart, VictoryBar, VictoryPolarAxis, VictoryTheme } from 'victory';
import { IChartFCProps } from '../types';

const Chart: React.FC<IChartFCProps> = (props: Readonly<IChartFCProps>) => {
	const data = props?.data;

	return (
		<VictoryChart polar theme={VictoryTheme.material}>
			<VictoryPolarAxis 
				style={{ axis: { stroke: 'none' }, tickLabels: { fill: 'black' } }} />
			<VictoryBar
				style={{ data: { fill: 0o0, stroke: 'black', fillOpacity: 0.7, strokeWidth: 2 , width: 25 }, labels: { fill: 'black', fontSize: 15 }}}
				data={[
					{ x: 'fitness', y: data.securitiesRating?.fitness },
					{ x: 'professional', y: data.securitiesRating?.professional },
					{ x: 'financial', y: data.securitiesRating?.financial },
					{ x: 'dietary', y: data.securitiesRating?.dietary },
					{ x: 'social', y: data.securitiesRating?.social },
				]}
			/>
		</VictoryChart>
	);
};

export default Chart;
