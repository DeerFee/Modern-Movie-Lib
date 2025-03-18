import React from 'react';
import { FolderListProps } from '../../types';

const FolderList: React.FC<FolderListProps> = ({ folders, onFolderSelect }) => {
    return (
        <div className="folder-list">
            {folders.map(folder => (
                <div 
                    key={folder.id}
                    className="folder-item"
                    onClick={() => onFolderSelect(folder.id)}
                >
                    {folder.name}
                </div>
            ))}
        </div>
    );
};

export default FolderList;