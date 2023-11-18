import './Chart.css'
import { LineChart, Treemap, RadialBar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

function Chart({ data, ...props }) {

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart width={730} height={250} data={data}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line name="value" type="monotone" dataKey="value" stroke="#8884d8" />
                    <Line name="name" type="monotone" dataKey="name" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart