// @flow
import React, {Component} from 'react';
import type {ScaleName} from '../../music/scale';
import {
    MAJOR_SCALE,
    Scale,
    SCALES
} from '../../music/scale';
import type {ScaleOptions} from '../../music/random';
import './Menu.scss';

export type Options = {
    includeAccidentals: boolean,
    includeModes: boolean,
    scales: ScaleOptions
};

export type OptionChangeHandler = (option: string, isEnabled: boolean) => void;
export type ScaleOptionChangeHandler = (scale: ScaleName, isEnabled: boolean) => void;

type Props = {
    isOpen: boolean,
    onClose: () => void,
    onOptionChange: OptionChangeHandler,
    onScaleOptionChange: ScaleOptionChangeHandler,
    options: Options
};

export default class Menu extends Component<Props> {
    get _onlyMajorScaleSelected(): string {
        const scales = this.props.options.scales;
        const numberOfScales = Object.keys(scales)
            .reduce((numberOfScales: number, scale: ScaleName) => scales[scale] ? numberOfScales + 1 : numberOfScales,
                0);
        return numberOfScales === 1 && scales[MAJOR_SCALE.name];
    }

    _handleOptionChange = (event: any) => {
        this.props.onOptionChange(event.target.value, event.target.checked);
    };

    _handleScaleOptionChange = (event: any) => {
        this.props.onScaleOptionChange(event.target.value, event.target.checked);
    };

    renderOptions() {
        const onlyMajorScaleSelected = this._onlyMajorScaleSelected;
        return (
            <div className="menu__options">
                <details className="menu__accidentals">
                    <summary>Notes</summary>
                    <div className="menu__menuItemGroup">
                        <label htmlFor="includeAccidentals" className="menu__menuItem">
                            <input
                                type="checkbox"
                                id="includeAccidentals"
                                name="includeAccidentals"
                                value="includeAccidentals"
                                checked={this.props.options.includeAccidentals}
                                onChange={this._handleOptionChange}/>
                            Accidentals
                        </label>
                    </div>
                </details>
                <details className="menu__scales">
                    <summary>Scales</summary>
                    <div className="menu__menuItemGroup">
                        {SCALES.map((scale: Scale) => (
                            <label htmlFor={scale.name} key={scale.name} className="menu__menuItem">
                                <input
                                    type="checkbox"
                                    id={scale.name}
                                    name={scale.name}
                                    value={scale.name}
                                    checked={this.props.options.scales[scale.name]}
                                    disabled={onlyMajorScaleSelected && scale.name === MAJOR_SCALE.name}
                                    onChange={this._handleScaleOptionChange}/>
                                {scale.name}
                            </label>
                        ))}
                    </div>
                </details>
                <details className="menu__modes">
                    <summary>Modes</summary>
                    <div className="menu__menuItemGroup">
                        <label htmlFor="includeModes" className="menu__menuItem">
                            <input
                                type="checkbox"
                                id="includeModes"
                                name="includeModes"
                                value="includeModes"
                                checked={this.props.options.includeModes}
                                onChange={this.props.onOptionChange}/>
                            Modes
                        </label>
                    </div>
                </details>
            </div>
        );
    }

    render() {
        const className = `menu${this.props.isOpen ? ' menu--open' : ''}`;
        return (
            <div className={className}>
                <button className="menu__closeMenuButton" onClick={this.props.onClose}/>
                {this.renderOptions()}
            </div>
        );

    }
}