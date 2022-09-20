import React from 'react';

function BackdropLoading() {
    return (
        <div 
             className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center z-100">
            <div style={{borderTopColor:"transparent"}}
                 className="w-16 h-16 border-4 border-white border-solid rounded-full animate-spin"></div>
        </div>
    )
}

export default BackdropLoading;
