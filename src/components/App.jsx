import { Component } from 'react';
import { ContactsForm } from './ContactsForm';
import { Section } from './Section';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import * as localStorage from './localStorage/localStorageUtils';

const KEY = 'contact_key';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    !localStorage.readItem(KEY) && localStorage.saveItem(KEY, []);
    this.setState({ contacts: localStorage.readItem(KEY) });
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.saveItem(KEY, contacts);
    }
  }

  formSubmitHandler = contact => {
    if (this.state.contacts.find(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  onChangeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== contactId),
    }));
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const toLowerCaseContacts = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(toLowerCaseContacts)
    );
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.contacts !== nextState.contacts;
  }

  render() {
    return (
      <div className="container">
        <Section
          title={
            'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d Artagnan'
          }
        >
          <ContactsForm onSubmit={this.formSubmitHandler} />
          <Filter
            onChangeFilter={this.onChangeFilter}
            filterValue={this.state.filter}
          />
          <ContactList
            contactsArr={this.getVisibleContacts()}
            deleteContact={this.onDeleteContact}
          />
        </Section>
      </div>
    );
  }
}
