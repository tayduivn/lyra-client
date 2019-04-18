import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Container } from '../../shared/library/components/layout';
import Panel from '../../shared/library/containers/panel';

const StepTwo = ({ link }) => <Container>{link}</Container>;

StepTwo.propTypes = {
  link: PropTypes.string
};

export default StepTwo;
