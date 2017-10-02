import PropTypes from 'prop-types';
import React, { Component } from 'react';
import omit from 'lodash.omit';
import {
  Base,
  Button,
  ButtonGroup,
  Heading,
  Image,
  Paragraph,
  Strong,
} from 'bw-axiom';
import FlexText from '../FlexText/FlexText';

export default class Product extends Component {
  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  static propTypes = {
    hasProduct: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    launchUrl: PropTypes.string.isRequired,
    moreInfoUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    const { t } = this.context;
    const {
      hasProduct,
      imageUrl,
      launchUrl,
      moreInfoUrl,
      name,
      ...rest
    } = this.props;
    const props = omit(rest, 'description');

    const imageDimensions = {
      maxWidth: '100%',
      minWidth: '13.5rem',
    };

    return (
      <Base { ...props } className="bw-product">
        <Image src={ imageUrl } style={ imageDimensions } />

        <Heading textSize="headline">
          <Strong>{ name }</Strong>
        </Heading>

        <Base className="bw-product__description">
          <Paragraph textColor="subtle">
            <FlexText>{ t(`${name.toLowerCase()}-description`) }</FlexText>
          </Paragraph>
        </Base>

        <ButtonGroup>
          { hasProduct && (
            <Button
                data-ra-ut="launch"
                full="small"
                onClick={ () => window.open(launchUrl, '_blank') }>
              { t('launch') }
            </Button>
          ) }

          { !hasProduct && (
            <Button
                data-ra-ut="more-info"
                full="small"
                onClick={ () => window.open(moreInfoUrl, '_blank') }
                style="secondary">
              { t('more-info') }
            </Button>
          ) }
        </ButtonGroup>
      </Base>
    );
  }
}
