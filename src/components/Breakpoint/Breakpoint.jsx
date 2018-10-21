// @flow
import React from 'react';
import './Breakpoint.scss';

export default function Breakpoint() {
    return (
        <>
            <div className="breakpoint breakpoint--mobile">Mobile</div>
            <div className="breakpoint breakpoint--tablet">Tablet</div>
            <div className="breakpoint breakpoint--desktop">Desktop</div>
        </>
    );
}