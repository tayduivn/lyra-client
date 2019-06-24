import React, { Fragment, useContext } from 'react';
import { DispatchContext, StateContext } from '../state/provider';
import Select from 'react-select';
import { Query } from 'react-apollo';
import { TOPICS_QUERY } from '../../../data/queries';

import { normalizeTopics } from '../../../shared/utils';

import { SET_SELECTED_TOPICS } from '../state/actions';

import { selectStyles } from '../components';

import {
  Label,
  LabelName,
  Field
} from '../../../shared/library/components/inputs';

const Topics = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { selectedTopics } = state;
  return (
    <Field>
      <Label>
        <LabelName>Topics</LabelName>
      </Label>
      <Query query={TOPICS_QUERY}>
        {({ loading, data: { topics } }) => (
          <Fragment>
            {!loading && (
              <Select
                styles={selectStyles}
                value={selectedTopics}
                openOnFocus={false}
                isMulti={true}
                noOptionsMessage={() => 'No topics found'}
                onChange={selectedOption => {
                  dispatch({
                    type: SET_SELECTED_TOPICS,
                    value: selectedOption
                  });
                }}
                options={normalizeTopics(topics)}
              />
            )}
          </Fragment>
        )}
      </Query>
    </Field>
  );
};

export default Topics;
