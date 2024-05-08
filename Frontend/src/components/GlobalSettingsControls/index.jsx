// styled components
import {Button} from './style';
import {useInterfaceContext} from '@contexts/interfaceContext';

export const ThemeControl = () => {
    const {isDarkMode, toggleDarkMode} = useInterfaceContext();
    return (
        <Button onClick={() => toggleDarkMode()}>
            <i className={`icon icon-${isDarkMode ? 'sun' : 'moon'}`}/>
            <span>{isDarkMode ? 'Light' : 'Dark'} theme</span>
        </Button>
    );
}
