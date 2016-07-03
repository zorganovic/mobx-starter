import size from 'lodash/fp/size'
import React from 'react'
import { connect } from 'mobx-connect'

@connect
class Menu extends React.Component {

    componentWillUnmount() {
        const { menu } = this.context.state
        menu.items = {}
    }

    getItem(index) {
        const { menu } = this.context.state
        return menu.items[index]
    }

    setIndex(newIndex, resetIndex = 0) {
        const { menu } = this.context.state

        if (newIndex < 0) newIndex = size(menu.items) - 1
        if (newIndex > size(menu.items) - 1) newIndex = 0

        menu.index = this.getItem(newIndex) ? newIndex : resetIndex
    }

    render() {
        const { menu } = this.context.state

        const children = React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                tabIndex: index,
                activeClassName: 'selected',
                //className: menu.index === index ? 'selected' : '',
                onClick: e => {
                    this.setIndex(e.target.tabIndex)
                },
                ref: c => menu.items[index] = c
            })
        })

        return <menu>
            {children}
        </menu>
    }
}

export default Menu;
