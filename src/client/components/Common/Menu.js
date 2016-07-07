import size from 'lodash/fp/size'
import React from 'react'
import { observable } from 'mobx'
import { connect } from 'mobx-connect'

@connect
class Menu extends React.Component {

    @observable menu = {
        index: 0,
        items: {}
    }

    componentWillUnmount() {
        this.menu.items = {}
    }

    getItem(index) {
        return this.menu.items[index]
    }

    setIndex(newIndex, resetIndex = 0) {
        if (newIndex < 0) newIndex = size(this.menu.items) - 1
        if (newIndex > size(this.menu.items) - 1) newIndex = 0

        this.menu.index = this.getItem(newIndex) ? newIndex : resetIndex
    }

    render() {
        const children = React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                tabIndex: index,
                activeClassName: 'selected',
                //className: menu.index === index ? 'selected' : '',
                onClick: e => this.setIndex(e.target.tabIndex),
                ref: c => this.menu.items[index] = c
            })
        })

        return <menu>
            {children}
        </menu>
    }
}

export default Menu;
