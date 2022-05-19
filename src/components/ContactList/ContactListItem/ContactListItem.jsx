import style from './ContactListItem.module.css';
import PropTypes from 'prop-types';

export const ContactListItem = ({ name, number, id, deleteContact }) => {
  return (
    <li className={style.list_item} key={id}>
      <p>
        {name}: {number}
      </p>
      <button
        className={style.button}
        onClick={() => {
          deleteContact(id);
        }}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
