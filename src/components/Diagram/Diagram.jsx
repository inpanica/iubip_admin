import { useEffect } from 'react';
import './Diagram.css'
import { LineChart, PieChart, Pie, Cell, YAxis, LabelList, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

function Diagram({ data, ...props }) {

    const colors = {
        'high': '#E77171',
        'medium': '#E7C671',
        'standard': '#71E776'
    }

    useEffect(() => console.log(data), [])

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
            <PieChart >
                <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill='#8884d8' label>
                    {
                        data.map((d) => (
                            <Cell key={`cell-${d.name}`} fill={colors[d.name]} />
                        ))
                    }
                </Pie>
                <Legend verticalAlign="top" height={36} />
            </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Diagram