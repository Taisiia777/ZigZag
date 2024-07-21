import NavButton from './NavButton';

const Buttons = () => {
    return (
        <div className="nav">
            <NavButton text='Mining' to='/mining' icon='mining' />
            <NavButton text='Friends' to='/friends' icon='friends' />
            <NavButton text='Store' to='/store' icon='back' />
            <NavButton text='Rating' to='/rating' icon='rating' />
            <NavButton text='Tasks' to='/tasks' icon='tasks' />
        </div>
    )
};

export default Buttons;