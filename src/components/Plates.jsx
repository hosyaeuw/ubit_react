import React from 'react'

import { map } from 'lodash'

import Plate from 'arui-feather/plate';

import IconOk from 'arui-feather/icon/ui/ok';
// import IconOk from 'arui-feather/icon/ui/ok';
import IconFail from 'arui-feather/icon/ui/fail';

import { deletePlate } from '../redux/actions/plates'

const Plates = ({ dispatch, useSelector }) => {

    const plates = useSelector(({ plates }) => plates.items);

    console.log(plates)

    const handleClosePlate = (index) => {
        dispatch(deletePlate(index))
    }

    const get_icon = (type) => {
        switch(type){
            case 'success':
                return <IconOk
                            colored={ true }
                        />
            case 'warning':
                break;
            case 'error':
                return <IconFail
                            colored={ true }
                        />
            default:
        }
    }

    return (
        <div className="plate_block">
            {map(plates, (plate, index) => (
                <Plate
                    key = {index}
                    title={plate.value}
                    type={plate.type}
                    hasCloser={ true }
                    onCloserClick={() => handleClosePlate(index)}
                    icon={get_icon(plate.type)}
                />
            ))}
        </div>
    )
}

export default Plates
