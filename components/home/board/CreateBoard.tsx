import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CrossIcon from "@/public/assets/icon-cross.svg";
import { useStore } from "@/util/store";
import { BoardType } from "@/util/interfaces";

export default function CreateBoard({ asMenuItem }: { asMenuItem: boolean }) {
  const store = useStore();

  const columnSchema = z.object({
    name: z.string().min(1, {
      message: "Column name cannot be empty",
    }),
  });

  const boardSchema = z.object({
    name: z.string().min(1, {
      message: "Board name cannot be empty",
    }),
    columns: z.array(columnSchema),
  });

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
      columns: [
        {
          name: "Todo",
        },
        {
          name: "Done",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  const onSubmit = (values: z.infer<typeof boardSchema>) => {
    const newBoard: BoardType = {
      name: values.name,
      columns: values.columns,
    };
    store.addBoard(newBoard);
  };

  const addColumn = () => {
    append({ name: "" });
  };

  const removeColumn = (index: number) => {
    remove(index);
  };

  return (
    <Dialog>
      <div className="mb-2 w-full pr-8">
        <DialogTrigger
          className={`${
            !asMenuItem ? "bg-nav-background pl-6" : ""
          } hover:bg-item-hover flex w-full items-center justify-start rounded-r-full p-4 text-lg font-bold text-primary-blue hover:text-primary-blue hover:opacity-100`}
        >
          Create New Board
        </DialogTrigger>
      </div>
      <DialogContent className="bg-nav-background w-96 p-8">
        <DialogHeader>
          <DialogTitle className="dialog-content-header flex items-center justify-between">
            Add a new board
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Board name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Web Design"
                      className="bg-nav-background border-primary-medium-grey"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Label>Columns</Label>
            {fields.map((item, index) => {
              return (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={`columns.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex space-x-4">
                          <Input
                            className="bg-nav-background border-primary-medium-grey"
                            {...field}
                          />
                          <Button
                            type="button"
                            onClick={() => removeColumn(index)}
                            className="bg-nav-background p-0"
                          >
                            <CrossIcon />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              );
            })}
            <Button
              type="button"
              onClick={addColumn}
              className="w-full rounded-full bg-[var(--item-hover)] font-bold text-primary-blue transition duration-200"
            >
              + Add New Column
            </Button>
            <Button
              className="rounded-full font-bold transition duration-200"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
