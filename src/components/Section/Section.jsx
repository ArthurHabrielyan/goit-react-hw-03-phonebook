import PropTypes from 'prop-types';

export const Section = ({ children, title }) => {
  return (
    <>
      <div className="section" title={title}>
        {children}
      </div>
    </>
  );
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
};
