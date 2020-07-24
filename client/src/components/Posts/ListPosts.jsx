import React from "react";
import { connect } from "react-redux";
import Post from "./Post";

function ListPosts({ filteredPosts }) {
  return (
    <div className="posts">
      {filteredPosts.map((post, idx) => (
        <Post post={post} key={idx} />
      ))}
    </div>
  );
}
const mapStateToProps = ({ user: { username } }) => ({ username });

export default connect(mapStateToProps)(ListPosts);
