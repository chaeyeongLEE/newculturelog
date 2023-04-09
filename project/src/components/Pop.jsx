import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dateData } from '../actions/date_action';
import Blogo from '../Blogo.png'
import Mlogo from '../Mlogo.png'
import Plogo from '../Plogo.png'

function Pop(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(props.date);
  const moveToBook = () => {
    dispatch(dateData(props.date));
    navigate('/Book');
  };

  const moveToMovie = () => {
    console.log(props.date);
    dispatch(dateData(props.date));
    navigate('/Movie');
  };

  const moveToPer = () => {
    dispatch(dateData(props.date));
    navigate('/Performance');
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      box-shadow="5px 5px 5px 5px red">
    
      <Modal.Header closeButton> 
      </Modal.Header>
      <Modal.Body>
      
        <p className='text-3xl mx-20'>Record</p>
        <p className='text-s mx-20'>
          기록하고 싶은 문화 선택 시 작성페이지로 이동합니다.
        </p>
        <br />
        <div className='flex justify-left gap-2 '>
  <Button onClick={moveToBook} className='w-1/3 border-neutral-500 bg-stone-100'>
    <div className='flex items-center'> {/* Add a div container for flexbox */}
      <img src={Blogo} alt='책' /> 
      <p className='text-black text-xl text-center ml-20'>BOOK</p> {/* Add margin left for spacing */}
    </div>
  </Button>
  <Button onClick={moveToMovie} className='w-1/3 border-neutral-500 bg-stone-100'>
    <div className='flex items-center'> {/* Add a div container for flexbox */}
      <img src={Mlogo} alt='영화' />
      <p className='text-black ml-20'>MOVIE</p> {/* Add margin left for spacing */}
    </div>
  </Button>
  <Button onClick={moveToPer} className='w-1/3 border-neutral-500 bg-stone-100'>
    <div className='flex items-center'> {/* Add a div container for flexbox */}
      <img src={Plogo} alt='공연' />
      <p className='text-black ml-20'>PERFORMANCE</p> {/* Add margin left for spacing */}
    </div>
  </Button>
</div>

      </Modal.Body>

      <Modal.Footer>
        <Button
          style={{
            marginLeft: 'auto',
            backgroundColor: 'rgb(204, 193, 193)',
            borderColor: 'white',
            display: 'inline-flex',
            float: 'right',
          }}
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Pop;
