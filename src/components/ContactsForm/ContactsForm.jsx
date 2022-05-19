import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './ContactsForm.module.css';
import PropTypes from 'prop-types';

export class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  reset = event => {
    this.setState({ name: '', number: '' });
    event.currentTarget.reset();
  };

  onChangeInputValue = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  addContactItem = event => {
    event.preventDefault();
    this.props.onSubmit({
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    });
    this.reset(event);
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={style.form} onSubmit={this.addContactItem}>
        <label>
          Name
          <input
            className={style.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.onChangeInputValue}
            value={name}
            required
          />
        </label>

        <label>
          Number
          <input
            className={style.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.onChangeInputValue}
            value={number}
            required
          />
        </label>

        <button className={style.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
