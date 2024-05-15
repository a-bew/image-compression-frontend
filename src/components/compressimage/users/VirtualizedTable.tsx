import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUsers, User } from './user';

const BUFFER_COUNT = 10; // Number of extra items to render for smoother scrolling

function VirtualizedList() {
  const [users, setUsers] = useState(createUsers());
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState<{ start: number; end: number }>({ start: 0, end: 10 });
  const [itemHeight, setItemHeight] = useState(0);

  const handleResize = useCallback(() => {
    const firstItem = containerRef.current?.querySelector('.user-card');
    if (firstItem) {
      const height = firstItem.getBoundingClientRect().height;
      setItemHeight(height);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleScroll = useCallback(() => {
    if (containerRef.current && itemHeight) {
      const { scrollTop, offsetHeight } = containerRef.current;
      const start = Math.floor(scrollTop / itemHeight);
      const visibleCount = Math.ceil(offsetHeight / itemHeight);
      const end = start + visibleCount + BUFFER_COUNT;
      setVisibleRange({ start, end });
    }
  }, [itemHeight]);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div ref={containerRef} style={{ height: '500px', overflowY: 'auto' }}>
      <div style={{ height: `${users.length * itemHeight}px`, position: 'relative' }}>
        {users.map((user, index) => (
          <UserCard key={user.id} user={user} index={index} visibleRange={visibleRange} itemHeight={itemHeight} />
        ))}
      </div>
    </div>
  );}

  const UserCard: React.FC<{ user: User; index: number; visibleRange: { start: number; end: number }; itemHeight: number }> = ({
    user,
    index,
    visibleRange,
    itemHeight,
  }) => {
    const { start } = visibleRange;
    const top = (index - start) * itemHeight;
  
    return (
      <div
        className="user-card"
        style={{
          position: 'absolute',
          top: `${top}px`,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span>{user.name}</span>
      </div>
    );
  };


export default VirtualizedList;