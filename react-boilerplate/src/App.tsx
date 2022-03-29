import "./styles.css"
import IMAGE from "./react.jpg"
import { ClickCounter } from "./ClickCounter"

export const App = () => {
	const nema = "testing"
	return (
		<>
			<h1>
				React Boilerplate {JSON.stringify(process.env.NODE_ENV)} -{nema}
				{process.env.name}
			</h1>
			<img src={IMAGE} alt="React Logo" width={300} height={200} />
			<ClickCounter />
		</>
	)
}
