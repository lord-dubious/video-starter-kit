"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

type KeyDialogProps = {} & Parameters<typeof Dialog>[0];

export function KeyDialog({ onOpenChange, open, ...props }: KeyDialogProps) {
  const [falKey, setFalKey] = useState("");

  const handleOnOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
  };

  const handleSave = () => {
    localStorage.setItem("falKey", falKey);
    handleOnOpenChange(false);
    setFalKey("");
  };

  return (
    <Dialog {...props} onOpenChange={handleOnOpenChange} open={open}>
      <DialogContent className="flex flex-col max-w-lg h-fit">
        <DialogHeader>
          <DialogTitle className="sr-only">Access Key</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col flex-1 gap-8">
          <h2 className="text-lg font-semibold flex flex-row gap-2">
            Save your own FAL Key
          </h2>
          <p>
            If you want to use beyong the rate limit provided by us, you should
            create and use your own FAL Key.
          </p>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Your FAL Key"
              value={falKey}
              onChange={(e) => setFalKey(e.target.value)}
            />
          </div>
          <div className="flex-1 flex flex-row items-end justify-center gap-2">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>

        <DialogFooter>
          <p className="text-muted-foreground text-sm mt-4 w-full text-center">
            You can get your FAL Key from{" "}
            <a
              className="underline underline-offset-2 decoration-foreground/50 text-foreground"
              href="https://fal.ai/dashboard/keys"
            >
              here
            </a>
            .
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
