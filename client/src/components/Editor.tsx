import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';

export default function Editor({ value, setFieldValue }: any) {
    // const [value, setValue] = useState<string | undefined>("Hello world!!");
    return (
        <div className="container">
            <MDEditor
                value={value}
                onChange={(val) => setFieldValue('content', val)}
            />
            <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
    );
}