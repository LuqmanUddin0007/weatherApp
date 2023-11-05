import Forecast from './components/Prediction'
import Search from './components/Search'

import useWeatherData from './hooks/useWeatherData'

const App = (): JSX.Element => {
  const { forecast, options, term, onOptionSelect, onSubmit, onInputChange } =
  useWeatherData()

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-200 via-rose-100 to-lime-600  w-full">
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  )
}

export default App
