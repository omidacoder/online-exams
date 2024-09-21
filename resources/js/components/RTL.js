import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

export default class RTL extends React.Component
{
    constructor(props){
        super(props);
    }
    render()
    {
// Configure JSS
        const jss = create({plugins: [...jssPreset().plugins, rtl()]});


        return (
            <StylesProvider jss={jss}>
                {this.props.children}
            </StylesProvider>
        );
    }
}
