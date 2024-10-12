import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../features/Profile.module.css';
import Container from '../../ui/Layout/Container';
import Button from '../../components/Button/Button.js';

const ProgramForm = ({ mode, data, handleUpdate, handleBack, handleSave }) => {
  const isViewMode = mode === 'view';

  return (
    <div className={styles.generalStyles_container} style={{ width: '50em' }}>
      <div className={styles.secondaryColumn}>
        <Container title={mode === 'edit' ? 'Edit Program' : mode === 'view' ? 'View Program' : 'Add New Program'} headingType="secondaryHeading">
          <div className={styles.Form_formRow}>
            <label htmlFor="ProgramName" className={styles.Form_formLabel}>Program Name</label>
            <input
              type="text"
              id="ProgramName"
              name="ProgramName"
              className={styles.Form_formInput}
              value={data.ProgramName || ''}
              onChange={handleUpdate}
              readOnly={isViewMode}
            />
          </div>
          <br />
          <div className={styles.Form_formRow}>
            <label htmlFor="ProgramCode" className={styles.Form_formLabel}>Program Code</label>
            <input
              type="text"
              id="ProgramCode"
              name="ProgramCode"
              className={styles.Form_formInput}
              value={data.ProgramCode || ''}
              onChange={handleUpdate}
              readOnly={isViewMode}
            />
          </div>
          <br />
          <div>
            {!isViewMode && <Button onClickBtn={handleSave}>{mode === 'edit' ? 'Update' : 'Save'}</Button>}
            <Button onClickBtn={handleBack}>Cancel</Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

ProgramForm.propTypes = {
  mode: PropTypes.oneOf(['add', 'edit', 'view']).isRequired,
  data: PropTypes.shape({
    ProgramName: PropTypes.string.isRequired,
    ProgramCode: PropTypes.string.isRequired,
  }).isRequired,
  //handleUpdate: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  //handleSave: PropTypes.func.isRequired,
};

export default ProgramForm;
