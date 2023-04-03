import { ThreeCircles } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
        <ThreeCircles
    height="50"
    width="50"
    color="orange"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel="three-circles-rotating"
    outerCircleColor=""
    innerCircleColor=""
    middleCircleColor=""
  />
  </div>
  )
}

export default Spinner