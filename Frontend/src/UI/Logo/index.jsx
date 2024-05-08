// assets
import logo from '@assets/logo.svg'
import nexuslogo from '@assets/nexuslogo.png'

// styling
import styled from 'styled-components';
import {colors, fonts, textSizes, breakpoints} from '@styles/vars';
import theme from 'styled-theming';

// components
import {NavLink} from 'react-router-dom';

// utils
import PropTypes from 'prop-types';

const Img = styled.img`
  width: 40px;
  height: 40px;
  will-change: transform;
  transition: transform var(--transition);
`

const Wrapper = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover, &:focus {
    Img {
      transform: scale(1.2);
    }
  }
`

const Text = styled.span`
  font-weight: 700;
  font-family: ${fonts.accent};
  font-size: ${textSizes['24']};

  .highlight {
    color: ${theme('theme', {
      light: colors.orange,
      dark: 'inherit'
    })};
  }

  ${breakpoints.tablet} {
    font-size: ${textSizes['32']};
  }
`

const Logo = ({compact}) => {
    return (
        <Wrapper as={NavLink} to="/dashboard_a" className="logo">
            <Img src={nexuslogo} alt="WellNexus"/>
            {
                !compact ?
                    <Text>
                        Well<span className="highlight">Nexus</span>
                    </Text>
                    : null
            }
        </Wrapper>
    )
}

Logo.propTypes = {
    compact: PropTypes.bool
}

export default Logo;