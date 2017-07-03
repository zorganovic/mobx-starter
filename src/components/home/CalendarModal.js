import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import DayPicker, { DateUtils } from 'react-day-picker'

import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Form from 'react-bootstrap/lib/Form'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Modal from 'react-bootstrap/lib/Modal'

@inject('todos')
@observer
class CalendarModal extends React.Component {

  state = {
      month: null,
      year: null,
      start: null,
      selectedDays: []
  }

  constructor(props) {
       super(props);
        
        const { todos } = this.props

        console.log(todos)

        this.state.month = todos.month
        this.state.year = todos.year
        this.state.start = new Date(todos.year, todos.month, 1, 0, 0);

        this.state.selectedDays = todos.selectedDays.slice()

        console.log(this.state)
     }

  handleDayClick = (day, { selected }) => {
      const { selectedDays } = this.state;
      if (selected) {
        const selectedIndex = selectedDays.findIndex(selectedDay =>
          DateUtils.isSameDay(selectedDay, day)
        );
        selectedDays.splice(selectedIndex, 1);
      } else {
        selectedDays.push(day);
      }
      // console.log('selectedDays')
      // console.log(selectedDays)
      this.setState({ selectedDays })
      const { todos } = this.props
      todos.selectedDays = { selectedDays }
      // console.log('todos.selectedDays ')
      // console.log(todos.selectedDays )

  }

  render() {
    const { show, todos } = this.props

    return <Modal show={show} >
        <Modal.Header>
            <Modal.Title>Edit Calendar</Modal.Title>
        </Modal.Header>

        <Form horizontal>
            <Modal.Body>
                <FormGroup controlId="fhDays">
                    <div>
                        <DayPicker
                          canChangeMonth={false}
                          initialMonth={this.state.start}
                          selectedDays={this.state.selectedDays}
                          onDayClick={this.handleDayClick}
                        />
                    </div>
                </FormGroup>                    
            </Modal.Body>
            <Modal.Footer>
                <FormGroup>
                    <Col smOffset={4} sm={2}>
                        <Button onClick={() => {todos.show_modal = false}} bsStyle="danger">
                            Cancel
                        </Button>
                    </Col>
                </FormGroup>
            </Modal.Footer>
        </Form>
    </Modal>
  }
}

export default CalendarModal