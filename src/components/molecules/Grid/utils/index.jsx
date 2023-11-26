// import { ComLib } from "commonFunction";

// import cloneDeepLodash from "lodash/cloneDeep";
import { IconImage } from "components/atoms";
import { useCallback, useMemo } from "react";

import styles from './../Grid.module.scss';

const GridIcon = (props) => {
    const eventParam = useMemo(() => {
        return { rowIndex: props.rowIndex, column: props.column, value: props.value, data: props.data, node: props.node}
    }, [props]);
    const buttonClicked = useCallback(() => {
        props.onClick && props.onClick(eventParam)
    }, [props, eventParam]);

    return (
        <IconImage
            id = {'IconGrid_${props.rowIndex}'}
            icon = {props.value}
            onClickHandler = {buttonClicked}
        />
    )
}

