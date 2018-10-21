// @flow
import React from 'react';
import './MenuBar.scss';

type Props = {
    onOpen: () => void
}

export default function MenuBar({onOpen}: Props) {
    return (
        <div className="menuBar">
            <button className="menuBar__openMenuButton" onClick={onOpen}/>
        </div>
    );
}