import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/tables";
import {
  actionColumns as getActionColumns,
} from "../../components/tables/columns";
import API_ENDPOINTS from "../../constants/api";
import CreateEditAction from "../../components/modals/actions/createEditAction";
import DeleteConfirmModal from "../../components/modals/common/DeleteConfirmModal";
import { Button } from "../../components/ui/button";
import { Action, deleteAction } from "../../services/actionService";
import { toast } from "sonner";
import Loader from "../../components/commons/loader";

const ActionsPage: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const fetchActions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_ENDPOINTS.actions.getAllActions);
      const { data } = response;
      setActions(data);
    } catch {
      setError("Failed to fetch actions");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (action: Action) => {
    setSelectedAction(action);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedAction(null);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    fetchActions();
  };

  const handleDelete = (action: Action) => {
    setSelectedAction(action);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedAction) return;
    try {
      await deleteAction(selectedAction.id);
      toast.success("Action deleted successfully");
      fetchActions();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Failed to delete action: ${error.message}`);
      } else {
        toast.error("Failed to delete action");
      }
    } finally {
      setIsDeleteConfirmOpen(false);
      setSelectedAction(null);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Actions</h1>
        <Button onClick={handleCreate} className="mb-4">
          Create Action
        </Button>
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <Loader/>
      ) : (
        <DataTable<Action>
          data={actions}
          columns={getActionColumns(handleEdit)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <CreateEditAction
        isOpen={isDialogOpen}
        actionToEdit={selectedAction}
        onOpenChange={setIsDialogOpen}
        onSuccess={handleSuccess}
      />
      <DeleteConfirmModal
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ActionsPage;
