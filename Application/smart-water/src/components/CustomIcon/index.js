import React from "react";
import * as VectorIcons from 'react-native-vector-icons';

function CustomIcon(props){
    const iconLibrary = VectorIcons[props.type];
    
    if(!iconLibrary){
        console.warn('Biblioteca de vetor não existe');
        return null;
    }

    const Icon = iconLibrary.default || iconLibrary;

    if(!Icon){
        console.warn(`Ícone '${props.name}' não encontrado`);
        return null;
    }

    return <Icon name={props.name} size={props.size} color={props.color}/>   
}

export default CustomIcon;