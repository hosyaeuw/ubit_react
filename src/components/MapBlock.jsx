import React from 'react'

import { YMaps, Map, Placemark } from 'react-yandex-maps';

const MapBlock = () => {
    return (
        <YMaps>
            <Map state={{ center: [63.557287, 53.696266], zoom: 15, controls: [] }} width={"100%"}>
                <Placemark
                    geometry={{
                        coordinates: [63.557287, 53.696266]
                    }}
                />
            </Map>
        </YMaps>
    )
}

export default MapBlock
