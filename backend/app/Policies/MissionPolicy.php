<?php

namespace App\Policies;

use App\Models\Mission;
use App\Models\Utilisateur;
use Illuminate\Auth\Access\Response;

class MissionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Utilisateur $utilisateur): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Utilisateur $utilisateur, Mission $mission): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Utilisateur $utilisateur): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Utilisateur $utilisateur, Mission $mission): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Utilisateur $utilisateur, Mission $mission): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Utilisateur $utilisateur, Mission $mission): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Utilisateur $utilisateur, Mission $mission): bool
    {
        //
    }
}
